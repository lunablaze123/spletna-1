(function () {
  // This script is intentionally using document.write()
  // because the legacy Beds24 calendar script can rely on synchronous parsing.
  // It runs where you place: <script src="assets/js/beds24-calendar-embed.js"></script>

  var propid = window.MMS_BEDS24_PROPID;
  var months = Number(window.MMS_BEDS24_CAL_MONTHS || 2);
  var width  = Number(window.MMS_BEDS24_CAL_WIDTH || 360);
  var target = (window.MMS_BEDS24_CAL_TARGET || "_self");
  var referer = (window.MMS_BEDS24_CAL_REFERER || "WebsiteCalendar");

  function esc(s){
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  if (!propid || isNaN(Number(propid))) {
    document.write(
      "<div class='smallnote' style='padding:12px;border:1px dashed rgba(255,255,255,.22);border-radius:14px;background:rgba(255,255,255,.04)'>" +
      "<strong>Setup required:</strong> Set <span class='kbd'>window.MMS_BEDS24_PROPID</span> in <span class='kbd'>index.html</span>." +
      "</div>"
    );
    return;
  }

  months = (months === 1 ? 1 : 2);
  if (!isFinite(width) || width < 200) width = 360;

  var pid = String(Number(propid));
  var pidPad = pid.padStart(8, "0"); // legacy widget uses zero-padded IDs
  var form1 = "ap" + pidPad;
  var form2 = "ap" + pidPad + "b";
  var arrName = "cb" + pidPad;

  // Start week on Monday (0 = Sunday, 1 = Monday, ...).
  // Must be declared before the calendar script runs.
  document.write("<script>var beds24CalStartDay=1;<\\/script>");

  // Two-month layout (best-effort). If cloning fails, you still get the first month.
  var cols = months === 2 ? "1fr 1fr" : "1fr";
  document.write("<div class='b24-months' style='display:grid;grid-template-columns:" + cols + ";gap:10px;align-items:start'>");

  // Month 1
  document.write("<form id='" + form1 + "' class='beds24calform' method='GET' target='" + esc(target) + "' action='https://beds24.com/booking.php' style='margin:0;padding:0;display:block'>");
  document.write("<script type='text/javascript' src='https://beds24.com/availcal/cal.jsp?propid=" + encodeURIComponent(pid) + "&width=" + encodeURIComponent(String(width)) + "'><\\/script>");
  document.write("<input type='hidden' name='propid' value='" + esc(pid) + "'>");
  document.write("<input type='hidden' name='fdate' value=''>");
  document.write("<input type='hidden' name='referer' value='" + esc(referer) + "'>");
  document.write("</form>");

  // Month 2 (clone)
  if (months === 2) {
    document.write("<form id='" + form2 + "' class='beds24calform' method='GET' target='" + esc(target) + "' action='https://beds24.com/booking.php' style='margin:0;padding:0;display:block'>");
    document.write("<script>try{var a=window['" + arrName + "']; if(a&&a[0]&&typeof a[0].clone==='function'){a[1]=a[0].clone('" + form2 + "');}}catch(e){}<\\/script>");
    document.write("<input type='hidden' name='propid' value='" + esc(pid) + "'>");
    document.write("<input type='hidden' name='fdate' value=''>");
    document.write("<input type='hidden' name='referer' value='" + esc(referer) + "'>");
    document.write("</form>");
    document.write("<script>try{var a=window['" + arrName + "']; if(a&&a[1]&&typeof a[1].nextMonth==='function'){a[1].nextMonth();}}catch(e){}<\\/script>");
  }

  document.write("</div>");
})();