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
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* 🔹 الزر (☰) */}
        <button
          onClick={() => setOpen(!open)}
          className="
            text-2xl
            font-bold
            text-blue-900
            bg-white/70
            border border-blue-200/40
            backdrop-blur-md
            rounded-full
            shadow-md
            px-4
            py-2
            hover:bg-blue-50
            transition-all
          "
        >
          ☰
        </button>

        {/* 🔹 القائمة المنسدلة */}
        {open && (
          <div
            className="
              absolute right-0 mt-2 w-44
              bg-white/95
              border border-blue-100
              shadow-lg
              rounded-lg
              overflow-hidden
              backdrop-blur-md
              animate-fadeIn
            "
          >
            {pages.map((page) => (
              <button
                key={page.path}
                onClick={() => handleNavigate(page.path)}
                className="
                  w-full text-right px-4 py-2
                  text-blue-900
                  hover:bg-blue-50
                  transition-colors
                "
              >
                {page.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
