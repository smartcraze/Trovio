/**
 * Deep Link Helper
 * Converts standard web URLs to native mobile application URI schemes.
 */

export function getDeepLinkScheme(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    const pathname = parsedUrl.pathname;

    // Remove leading/trailing slashes and split path
    const pathParts = pathname.split("/").filter(Boolean);

    // 1. Instagram
    if (hostname.includes("instagram.com")) {
      if (pathParts.length === 1) {
        // e.g. instagram.com/username
        return `instagram://user?username=${pathParts[0]}`;
      } else if (pathParts[0] === "p" && pathParts[1]) {
        // e.g. instagram.com/p/postId
        return `instagram://media?id=${pathParts[1]}`;
      }
      return `instagram://camera`;
    }

    // 2. Twitter / X
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      if (pathParts.length === 1) {
        // e.g. twitter.com/username
        return `twitter://user?screen_name=${pathParts[0]}`;
      } else if (pathParts[1] === "status" && pathParts[2]) {
        // e.g. twitter.com/username/status/tweetId
        return `twitter://status?id=${pathParts[2]}`;
      }
      return `twitter://`;
    }

    // 3. YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      if (hostname.includes("youtu.be") && pathParts[0]) {
        return `youtube://www.youtube.com/watch?v=${pathParts[0]}`;
      }
      if (pathname.includes("watch")) {
        const videoId = parsedUrl.searchParams.get("v");
        if (videoId) {
          return `youtube://www.youtube.com/watch?v=${videoId}`;
        }
      }
      if (pathParts[0] === "channel" && pathParts[1]) {
        return `youtube://www.youtube.com/channel/${pathParts[1]}`;
      }
      if (pathParts[0]?.startsWith("@")) {
        return `youtube://www.youtube.com/user/${pathParts[0].substring(1)}`;
      }
      return `youtube://`;
    }

    // 4. Spotify
    if (hostname.includes("spotify.com")) {
      // open.spotify.com/track/trackId -> spotify:track:trackId
      if (pathParts.length >= 2) {
        const type = pathParts[0]; // track, artist, album, playlist
        const id = pathParts[1];
        return `spotify:${type}:${id}`;
      }
      return `spotify:`;
    }

    // 5. TikTok
    if (hostname.includes("tiktok.com")) {
      if (pathParts[0]?.startsWith("@")) {
        return `snssdk1128://user/profile/${pathParts[0].substring(1)}`;
      }
      return `tiktok://`;
    }

    // 6. GitHub
    if (hostname.includes("github.com")) {
      if (pathParts.length >= 1) {
        return `github://`;
      }
    }
  } catch (e) {
    // If URL parsing fails, return null
  }
  return null;
}

/**
 * Checks if current device is a mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Attempts to launch deep link with fallback to regular URL
 */
export function triggerDeepLink(url: string, isDeepLinkEnabled: boolean): void {
  if (typeof window === "undefined") return;

  const appScheme = getDeepLinkScheme(url);

  if (isDeepLinkEnabled && isMobileDevice() && appScheme) {
    // Try to launch deep link
    const start = Date.now();
    window.location.href = appScheme;

    // Check if the user navigated away. If not, open the browser fallback
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.open(url, "_blank");
      }
    }, 1000);
  } else {
    // Regular browser redirect
    window.open(url, "_blank");
  }
}
