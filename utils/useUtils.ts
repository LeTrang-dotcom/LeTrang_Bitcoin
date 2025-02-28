export function useUtils() {
function getCookieOnClient(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const part = parts.pop();
        if (part) {
            return part.split(";").shift() || null;
        }
    }
    return null;
}

interface CookieStore {
    get: (name: string) => { value: string } | undefined;
}

async function getCookieOnServer(name: string): Promise<string | null> {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const cookies = require("next/headers").cookies;
    const cookieStore: CookieStore = await cookies();
    const cookie = cookieStore.get(name);
    if (cookie) {
        return cookie.value;
    }
    return null;
}

async function getCookie(name: string): Promise<string | null> {
    if (typeof window === "undefined") {
        return await getCookieOnServer(name);
    }
    return getCookieOnClient(name);
}

  return {
    getCookieOnServer,
    getCookieOnClient,
    getCookie,
  };
}
