import { Capacitor } from "@capacitor/core";

function getDesktopOS() {
	const ua = navigator.userAgent;

	if (ua.includes("Win")) {
		return "windows";
	}

	if (ua.includes("Mac")) {
		return "mac";
	}

	if (ua.includes("Linux")) {
		return "linux";
	}

	return "unknown";
}

export function usePlatform() {
	const platform = Capacitor.getPlatform();
	const isMobile = Capacitor.isNativePlatform();
	const desktopOS = !isMobile ? getDesktopOS() : null;

	return {
		isMobile,
		isIOS: platform === "ios",
		isAndroid: platform === "android",
		isWeb: platform === "web",
		isWin: desktopOS === "windows",
		isMac: desktopOS === "mac",
		isLinux: desktopOS === "linux",
	}
}