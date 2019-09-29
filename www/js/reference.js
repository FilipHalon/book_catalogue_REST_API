$(function () {

    // console.log("Warsztaty z AJAX i REST API.");
    //
    // var book = {
    //     id: 10,
    //     isbn: "732648236587235682357",
    //     title: "Ciekawa książka",
    //     author: "Ciekawy autor",
    //     publisher: "Ciekawey wydawca",
    //     comments: ["Ciekawa", "Bardzo ciekawa"]
    // };
    //
    // var json = JSON.stringify(book);
    // console.log(json);
    //
    // var stringified = '{"id":10,"isbn":"732648236587235682357","title":"Ciekawa książka","author":"Ciekawy autor","publisher":"Ciekawey wydawca","comments":["Ciekawa","Bardzo ciekawa"]}';
    // var parsed = JSON.parse(stringified);
    // console.log(parsed);

//     $.ajax({
//         url: "http://date.jsontest.com",
//         type: "GET", // jest domyślny
//     }).done(function (response) { // serwer działa i rozumie nasze zapytanie; nazwa response jest często spotykana
//         console.log(response);
//     }).fail(function(xhr, status, error) { // jeśli przekaże się jeden parametr, to będzie error
//         alert("Ups, coś nie działa");
//         console.warn(status, error)
//     });
//
//     $.ajax({
//         url: "https://swapi.co/api/people/4/",
//         type: "GET",
//     }).done(function (response) {
//         console.log(response);
//         console.log(response.starships[0]);
//         $.ajax({
//             url: response.starships[0],
//             type: "GET"
//         }).done(function (res) {
//             console.log(res);
//         });
//     }).fail(function (xhr, status, error) {
//         alert("Ups, coś nie działa");
//         console.warn(status, error)
//     })
// });

    ajax("https://swapi.co/api/people/4/", "GET").done(function (resp) {
        console.log(resp);
        ajax(resp.starships[0], "GET").done(function (resp) {
            console.log(resp);
        })
    });

    const posts = $("#posts");

    ajax("https://jsonplaceholder.typicode.com/posts").done(function (post) {
        console.log(post);
        post.forEach(function (item, index) {
            posts.append($("<li>").attr('data-id', index).text(item.title));
        })
    });

    var myPost = {
        title: "Mój nowy post",
        body: "Treść nowego posta",
        userId: 1
    };

    //serwer nie wymaga serializacji
    ajax("https://jsonplaceholder.typicode.com/posts", "POST", JSON.stringify(myPost)).done(function (response) {
        console.log(response);
    });

    ajax("https://jsonplaceholder.typicode.com/posts/1", "DELETE").done(function (response) {
        console.log(response) // pusty obiekt oznacza, że zapytanie przebiegło prawidłowo
    });

    ajax("https://jsonplaceholder.typicode.com/posts/cos", "DELETE").done(function (response) {
        console.log(response) // pusty obiekt oznacza, że zapytanie przebiegło prawidłowo
    });

    function ajax(url, type, data) {
        return $.ajax({
            url: url,
            type: type,
            data: data,
            contentType: "application/json"
        }).fail(function (xhr, status, error) {
            console.error(error);
        })
    }
});