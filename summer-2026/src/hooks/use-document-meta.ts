import { useEffect } from "react";

interface MetaProps {
  title: string;
  description: string;
  type?: "website" | "article";
}

export function useDocumentMeta({ title, description, type = "website" }: MetaProps) {
  useEffect(() => {
    document.title = title;
    
    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (selector.startsWith('meta[name="')) {
          el.setAttribute("name", selector.match(/name="([^"]+)"/)?.[1] || "");
        } else if (selector.startsWith('meta[property="')) {
          el.setAttribute("property", selector.match(/property="([^"]+)"/)?.[1] || "");
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    setMetaTag('meta[name="description"]', "content", description);
    setMetaTag('meta[property="og:title"]', "content", title);
    setMetaTag('meta[property="og:description"]', "content", description);
    setMetaTag('meta[property="og:type"]', "content", type);
    setMetaTag('meta[name="twitter:title"]', "content", title);
    setMetaTag('meta[name="twitter:description"]', "content", description);
  }, [title, description, type]);
}
