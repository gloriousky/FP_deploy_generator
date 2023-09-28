import $ from "jquery";

export default {
  name: "cell-hidden",
  direcitve(el) {
    const myIndex = $(el).index();
    const tbody = $(el).parents("thead").eq(0).siblings("tbody");
    tbody.find("tr").each(function () {
      $(this)
        .find("td")
        .each(function (tdIdx) {
          if (tdIdx === myIndex) {
            $(this).addClass("hidden md:table-cell");
          }
        });
    });
    el.classList.add("hidden", "md:table-cell");
  },
};
