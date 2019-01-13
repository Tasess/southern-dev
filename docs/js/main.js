window.onload = function () {

  /*!
   * Serialize all form data into a query string
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */

  const serialize = function (form) {

    // Setup our serialized data
    var serialized = {};

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {

      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized[encodeURIComponent(field.name)] = encodeURIComponent(field.options[n].value);
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized[encodeURIComponent(field.name)] = encodeURIComponent(field.value);
      }
    }
    return serialized;
  };

  /* Subscribe Form submittal */
  var form = document.forms.namedItem('emailAdd');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = serialize(form);
    fetch("https://gothic-welder-217319.appspot.com", {
        method: "POST",
        headers: {
          "content-type": "text/plain"
        },
        body: JSON.stringify(formData)
      })
      .then(function (resp) {
        return resp.text();
      })
      .then(function (data) {
        console.log(data);
        results.textContent = data;
      })
      .catch(function (error) {
        console.error(error);
      })
  });

  /* Insta Filters */

  const instaFilters = document.querySelector(".insta-filters"),
   splashImg = document.getElementById("splash-img"),
   devBtn = document.getElementById("dev-btn");

  function GenerateFilters (){
    const filterArray = ["sepia", "default"];

    filterArray.forEach(function(element) {
      let filterButton = document.createElement("button");
      filterButton.id = element;
      filterButton.innerHTML = element;
      instaFilters.appendChild(filterButton);
    });

    devBtn.style.display = "none";
  }

  devBtn.addEventListener("click", GenerateFilters);

  instaFilters.addEventListener("click", function (event) {
    let instaFilter = event.target;
    switch (instaFilter.id) {
      case "sepia":
        splashImg.style.webkitfilter = "sepia(1)";
        splashImg.style.filter = "sepia(1)";
        break;
      default:
        splashImg.style.webkitfilter = "";
        splashImg.style.filter = "";
        break;
    };

  });

}