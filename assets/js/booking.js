(function () {
  function buildBeds24Url(base, cssUrl) {
    var u = new URL(base);
    if (cssUrl) u.searchParams.set("cssfile", cssUrl);
    u.searchParams.set("lang", "en");
    return u.toString();
  }

  function initBooking(content) {
    var base = (content.booking && content.booking.beds24_base_url) || "https://beds24.com/booking2.php";
    var cssUrl = (content.booking && content.booking.beds24_css_url) || "";
    var openNewTab = (content.booking && typeof content.booking.open_in_new_tab === "boolean")
      ? content.booking.open_in_new_tab
      : true;

    var url = buildBeds24Url(base, cssUrl);

    // Attach to any button/link with data-open-booking
    document.querySelectorAll("[data-open-booking]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (openNewTab) {
          window.open(url, "_blank", "noopener");
        } else {
          window.location.href = url;
        }
      });
    });

    // Optional: if the calendar embed is present, make its fallback button use the same booking URL.
    window.MMS_BEDS24_BOOKING_URL = url;
  }

  window.MMS_initBooking = initBooking;
})();