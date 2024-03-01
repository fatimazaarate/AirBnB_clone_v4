$(document).ready(function () {
    const amenity_dict = {};
    $('input[type="checkbox"]').change(function () {
        const data_id = $(this).attr('data-id');
        const data_name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            amenity_dict[data_id] = data_name;
        } else {
            delete amenity_dict[data_id];
        }
        const amenity_list = [];
        for (const amemity in amenity_dict) {
            amenity_list.push(amenity_dict[amemity]);
        }
        $('.amenities h4').text(amenity_list.join(', '));
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK')
        {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                const place = data[i];
                const placeshtml = `<article>
                                    <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">${place.price_by_night}</div>
                                    </div>
                                    <div class="information">
                                    <div class="max_guest">${place.max_guest} Guests</div>
                                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                    </div>
                                    <div class="description">${place.description}</div>
                                </article>`;

                $('section.places').append(placeshtml);
            }
        }
    });
});
