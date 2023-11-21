import React, { useRef, useEffect, useContext } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";

const TransitionContext = React.createContext({
  parent: {},
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

function CSSTransition({
  show,
  enter = "",
  enterStart = "",
  enterEnd = "",
  leave = "",
  leaveStart = "",
  leaveEnd = "",
  appear,
  unmountOnExit,
  tag = "div",
  children,
  ...rest
}) {
  const enterClasses = enter.split(" ").filter((s) => s.length);
  const enterStartClasses = enterStart.split(" ").filter((s) => s.length);
  const enterEndClasses = enterEnd.split(" ").filter((s) => s.length);
  const leaveClasses = leave.split(" ").filter((s) => s.length);
  const leaveStartClasses = leaveStart.split(" ").filter((s) => s.length);
  const leaveEndClasses = leaveEnd.split(" ").filter((s) => s.length);
  const removeFromDom = unmountOnExit;

  function addClasses(node, classes) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node, classes) {
    classes.length && node.classList.remove(...classes);
  }

  const noderef = useRef(null);
  const Component = tag;

  return (
    <ReactCSSTransition
      appear={appear}
      noderef={noderef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done) => {
        noderef.current.addEventListener("transitionend", done, false);
      }}
      onEnter={() => {
        if (!removeFromDom) noderef.current.style.display = null;
        addClasses(noderef.current, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        removeClasses(noderef.current, enterStartClasses);
        addClasses(noderef.current, enterEndClasses);
      }}
      onEntered={() => {
        removeClasses(noderef.current, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(noderef.current, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(noderef.current, leaveStartClasses);
        addClasses(noderef.current, leaveEndClasses);
      }}
      onExited={() => {
        removeClasses(noderef.current, [...leaveEndClasses, ...leaveClasses]);
        if (!removeFromDom) noderef.current.style.display = "none";
      }}>
      <Component
        ref={noderef}
        {...rest}
        style={{ display: !removeFromDom ? "none" : null }}>
        {children}
      </Component>
    </ReactCSSTransition>
  );
}

function Transition({ show, appear, ...rest }) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}>
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
