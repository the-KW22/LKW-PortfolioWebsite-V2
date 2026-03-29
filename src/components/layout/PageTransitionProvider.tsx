"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useCallback } from "react";

type TransitionFn = (href: string) => void;

const PageTransitionContext = createContext<TransitionFn>(() => {});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const transitionTo = useCallback((href: string) => {
        router.push(href);
    }, [router]);

    return (
        <PageTransitionContext.Provider value={transitionTo}>
            {children}
        </PageTransitionContext.Provider>
    );
}

export function usePageTransition(): TransitionFn {
    return useContext(PageTransitionContext);
}
