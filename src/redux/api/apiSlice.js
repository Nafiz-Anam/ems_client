import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("auth");
            const recoverToken = localStorage.getItem("recoverToken");
            if (token) {
                headers.set(
                    "authorization",
                    `Bearer ${JSON.parse(token).accessToken}`
                );
            } else if (recoverToken) {
                headers.set(
                    "authorization",
                    `Bearer ${JSON.parse(recoverToken).recoverToken}`
                );
            }
            return headers;
        },
    }),
    tagTypes: ["Categories"],
    endpoints: () => ({}),
});
