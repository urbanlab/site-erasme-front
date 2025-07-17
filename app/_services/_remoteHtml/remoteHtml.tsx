import DOMPurify from 'isomorphic-dompurify';
import styles from './remoteHtml.module.css';

/**
 * Remove `<br>` inside tag openings like `<div ... <br> ...>`
 * */
const cleanMalformedTags = (input: string): string => {
    return input.replace(/<([a-z]+)([^>]*?)<br[^>]*>([^>]*)>/gi, '<$1$2$3');
};

/**
 * Assure that all elements that can function as a link will open the linked page in a new tab or window.
 * see: https://github.com/cure53/DOMPurify/tree/main/demos#hook-to-open-all-links-in-a-new-window-link
 */
const forceLinksToOpenInNewTab = () => {
    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
        // set all elements owning target to target=_blank
        if ('target' in node) {
            node.setAttribute('target', '_blank');
        }
        // set non-HTML/MathML links to xlink:show=new
        if (!node.hasAttribute('target') && (node.hasAttribute('xlink:href') || node.hasAttribute('href'))) {
            node.setAttribute('xlink:show', 'new');
        }
    });
};

/**
 * Processes sanitized HTML and replaces `<iframe>` tags based on {@link allowedThirdPartyServices} parameter.
 * Only iframes from allowed third-party services are kept; others are replaced with a placeholder message
 * prompting the user to accept cookies for that service.
 *
 * This function is used by {@link RemoteHtmlWithIframesAndCookieConsentManagement} to ensure that embedded content
 * respects user privacy and cookie consent preferences.
 *
 * @param html - The sanitized HTML string containing potential `<iframe>` tags.
 * @param allowedThirdPartyServices - Array of third-party service names (e.g. ['youtube', 'vimeo']) that are allowed.
 * @returns The HTML string with only allowed iframes, and placeholders for blocked services.
 */
const checkThirdPartyCookies = (html: string, allowedThirdPartyServices: string[]) => {
    const iframeTagDetectionRegExp = /<iframe\s+([^>]*?)><\/iframe>/gi;
    const fallbackDetection = `<div></div>`;

    return html.replace(iframeTagDetectionRegExp, (match, attributes) => {
        const srcMatch = attributes.match(/src\s*=\s*["']([^"']+)["']/i);
        if (!srcMatch) return fallbackDetection; // If no src, returns fallback html

        const src = srcMatch[1];

        // Extract service from src URL
        let service = '';

        try {
            const url = new URL(src);
            const host = url.hostname;

            if (host.includes('youtube.com') || host.includes('youtu.be')) {
                service = 'youtube';
            } else if (host.includes('vimeo.com')) {
                service = 'vimeo';
                // } else if (host.includes('dailymotion.com')) {
                //     service = 'dailymotion';
            } else {
                service = host.split('.').slice(-2, -1)[0]; // fallback: take the domain
            }
        } catch {
            return fallbackDetection; // If URL parsing fails, returns fallback html
        }

        // If service is allowed, keep the iframe
        if (allowedThirdPartyServices.includes(service)) {
            return match;
        }

        return `<div data-service="${service}">Vous devez accepter les cookies du service <i>${service}</i> pour voir ce contenu. Rechargez cette page après avoir accepté.</div>`;
    });
};

/**
 * Renders remote HTML content with support for `<iframe>` tags, but only allows iframes from services
 * that the user has accepted. Iframes from unaccepted services are replaced with
 * a placeholder message prompting the user to accept cookies for that service.
 *
 * Cleans malformed tags before sanitization. Uses DOMPurify to sanitize the HTML and adds back allowed iframes.
 *
 * @param html - The raw HTML string to sanitize and render.
 * @param allowedThirdPartyServices - Array of third-party service names (e.g. ['youtube', 'vimeo']) that are allowed.
 * @param className - Optional CSS class to apply to the container div.
 *
 * @returns A `<div>` containing the resulting HTML.
 */
const RemoteHtmlWithIframesAndCookieConsentManagement = ({
    html,
    allowedThirdPartyServices,
    className,
}: {
    html: string;
    allowedThirdPartyServices: string[];
    className?: string;
}) => {
    const cleanedHtml = cleanMalformedTags(html);

    forceLinksToOpenInNewTab();

    const sanitizedHtml = DOMPurify.sanitize(cleanedHtml, { ADD_TAGS: ['iframe'] });

    const cookieSafeHtml = checkThirdPartyCookies(sanitizedHtml, allowedThirdPartyServices);

    return <div className={`${styles.remoteHtml} ${className}`} dangerouslySetInnerHTML={{ __html: cookieSafeHtml }} />;
};

/**
 * Renders sanitized remote HTML content, forbidding `<iframe>` tags for security and for cookie consent management.
 * Cleans malformed tags before sanitization. The sanitized HTML is injected into a `<div>`.
 *
 * Iframes are not included to prevent unwanted tracking and to respect user cookie consent preferences.
 * For HTML that requires iframe support and cookie consent management, use {@link RemoteHtmlWithIframesAndCookieConsentManagement}.
 *
 * @param html - The raw HTML string to sanitize and render.
 * @param className - Optional CSS class to apply to the container div.
 *
 * @returns A `<div>` containing the sanitized HTML.
 */
const RemoteHtml = ({ html, className }: { html: string; className?: string }) => {
    const cleanedHtml = cleanMalformedTags(html);

    forceLinksToOpenInNewTab();

    const sanitizedHtml = DOMPurify.sanitize(cleanedHtml, { FORBID_TAGS: ['iframe'] });

    return <div className={`${styles.remoteHtml} ${className}`} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

/**
 * Renders sanitized remote HTML as plain text, removing all images, iframes, and styling tags.
 * Only `<p>` tags are allowed, and all attributes are stripped for maximum safety.
 * The output is truncated to the specified textReturnLength.
 *
 * This component is safe for both client and server rendering, and does not trigger any cookie or tracking concerns.
 *
 * @param html - The raw HTML string to sanitize and render.
 * @param textReturnLength - If defined, the maximum number of characters to display from the sanitized HTML.
 * @param removeInnerHtmlTags Optional parameter to return only text inside div, without inner `<p>` tags. Default is false.
 * @param className - Optional CSS class to apply to the container div.
 *
 * @returns A `<div>` containing the sanitized and (optionally) truncated HTML.
 */
const RemoteHtmlRawText = ({
    html,
    textReturnLength = -1,
    removeInnerHtmlTags = false,
    className,
}: {
    html: string;
    textReturnLength?: number;
    removeInnerHtmlTags?: boolean;
    className?: string;
}) => {
    const cleanedHtml = cleanMalformedTags(html);

    const sanitizedHtml = DOMPurify.sanitize(cleanedHtml, {
        ALLOWED_ATTR: [],
        ALLOWED_TAGS: removeInnerHtmlTags ? ['#text'] : ['p'],
    });

    const slicedHtml = textReturnLength === -1 ? sanitizedHtml : `${sanitizedHtml.slice(0, textReturnLength)}...`;

    return <div className={`${styles.remoteHtml} ${className}`} dangerouslySetInnerHTML={{ __html: slicedHtml }} />;
};

export { RemoteHtml, RemoteHtmlRawText, RemoteHtmlWithIframesAndCookieConsentManagement };
