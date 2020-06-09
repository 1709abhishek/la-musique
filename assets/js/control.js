{
    let addToQueue = function () {
        // method to submit the form data for new post using AJAX
        $(document).on('click', '.addQueue', function (e) {
            //your code goes here
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(this).attr('href'),
                success: function (data) {
                    console.log("success");
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    let addToFavoriteSongs = function () {
        // method to submit the form data for new post using AJAX
        $(document).on('click', '.addSongFav', function (e) {
            //your code goes here
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(this).attr('href'),
                success: function (data) {
                    console.log("success");
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    let addToPlaylist = function () {
        // method to submit the form data for new post using AJAX
        $(document).on('click', '.addToPlaylist', function (e) {
            //your code goes here
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(this).attr('href'),
                success: function (data) {
                    console.log("success");
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    let addArtist = function () {
        // method to submit the form data for new post using AJAX
        $(document).on('click', '.markArtist', function (e) {
            //your code goes here
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(this).attr('href'),
                success: function (data) {
                    console.log("success");
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // newPostForm.submit(function(e){
    //     e.preventDefault();

    //     $.ajax({
    //         type: 'post',
    //         url: '/posts/create',
    //         data: newPostForm.serialize(),
    //         success: function(data){
    //             let newPost = newPostDom(data.data.post);
    //             $('#posts-list-container>ul').prepend(newPost);
    //             deletePost($('.delete-post-button', newPost));
    //         }, error: function(error){
    //             console.log(error.responseText);
    //         }
    //     });
    // });


    addToQueue();
    addToFavoriteSongs();
    addToPlaylist();
    addArtist();
}