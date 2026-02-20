const menu_items_drop_down = document.querySelectorAll(".menu-item-dropdown");
const menu_item_static = document.querySelectorAll(".menu-item-static");
const sidebar = document.getElementById("sidebar");
const menu_btn = document.getElementById("menu_btn");
const sidebar_btn = document.getElementById("sidebar_btn");
const dark_mode_btn = document.getElementById("dark_mode_btn");

dark_mode_btn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

sidebar_btn.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-hidden");
});

menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("minimize");
});

menu_items_drop_down.forEach((menu_item) => {
  menu_item.addEventListener("click", (e) => {
    // Prevenir que el click en un enlace interno cierre/abra el menú padre abruptamente
    if (e.target.classList.contains('sub-menu-link')) return;

    const sub_menu = menu_item.querySelector(".sub-menu");
    const is_active = menu_item.classList.toggle("sub-menu-toggle");

    if (is_active) {
      sub_menu.style.height = `${sub_menu.scrollHeight + 6}px`;
      sub_menu.style.padding = ".2rem 0";
    } else {
      sub_menu.style.height = "0";
      sub_menu.style.padding = "0";
    }

    // Cerrar los demás submenús
    menu_items_drop_down.forEach((item) => {
      if (item !== menu_item) {
        const otro_sub_menu = item.querySelector(".sub-menu");
        if (otro_sub_menu) {
          otro_sub_menu.style.height = "0";
          otro_sub_menu.style.padding = "0";
          item.classList.remove("sub-menu-toggle");
        }
      }
    });
  });
});

menu_item_static.forEach((menu_item) => {
  menu_item.addEventListener("mouseenter", () => {
    if (!sidebar.classList.contains("minimize")) {
      return;
    }
    menu_items_drop_down.forEach((item) => {
      const otro_sub_menu = item.querySelector(".sub-menu");
      if (otro_sub_menu) {
        otro_sub_menu.style.height = "0";
        otro_sub_menu.style.padding = "0";
        item.classList.remove("sub-menu-toggle");
      }
    });
  });
});

function checkWindowsSize() {
  sidebar.classList.remove("minimize");
}

// OPTIMIZACIÓN: Función Debounce para no sobrecargar el navegador al redimensionar
function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

// Ejecutar checkWindowsSize solo cuando el usuario deje de redimensionar por 250ms
const optimizedResize = debounce(checkWindowsSize, 250);

checkWindowsSize();
window.addEventListener("resize", optimizedResize);