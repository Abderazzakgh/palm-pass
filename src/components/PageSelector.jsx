import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PageSelector() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const pages = [
    { name: "الرئيسية", path: "/" },
    { name: "التسجيل", path: "/registration" },
    { name: "تسجيل الدخول", path: "/auth" },
    { name: "ربط الحساب", path: "/link-account" },
    { name: "الخصوصية", path: "/privacy" },
    { name: "الشروط والأحكام", path: "/terms" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="fixed top-3 right-3 z-50">
      <div className="relative">
        {/* 🔹 الزر */}
        <button
          onClick={() => setOpen(!open)}
          className="
            text-lg
            text-blue-900
            bg-white/80
            border border-blue-200/50
            backdrop-blur-md
            rounded-full
            shadow-sm
            w-8 h-8
            flex items-center justify-center
            hover:bg-blue-50/90
            hover:scale-105
            active:scale-95
            transition-all duration-200
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* 🔹 القائمة المنسدلة */}
        <div
          className={`
            absolute right-0 mt-2 w-40
            bg-white/90
            border border-blue-100
            shadow-lg
            rounded-lg
            overflow-hidden
            backdrop-blur-md
            transition-all duration-200 origin-top-right
            ${open 
              ? 'transform scale-100 opacity-100' 
              : 'transform scale-95 opacity-0 pointer-events-none'
            }
          `}
        >
          {pages.map((page) => (
            <button
              key={page.path}
              onClick={() => handleNavigate(page.path)}
              className="
                w-full text-right px-3 py-1.5
                text-sm text-blue-900
                hover:bg-blue-50/80
                hover:text-blue-700
                transition-colors
                flex items-center justify-end gap-2
                group
              "
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">›</span>
              {page.name}
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
}
