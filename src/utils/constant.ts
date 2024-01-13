const host = import.meta.env.BASE_URL

export const CLIENT_TOKEN = '__CLIENT_TOKEN__'

export const endPoint = {
    // navbar
    music: host.concat('music'),
    artist: host.concat('artist'),
    trend: host.concat('trend'),
    category: host.concat('category'),
    // sidebar
    home: host.concat(''),
    favor: host.concat('favourite'),
    recent: host.concat('recent'),
    albums: host.concat('album'),
    download: host.concat('download'),
    upload: host.concat('upload'),
    playlist: host.concat('playlist'),
}

export const errorValue = {
    image: 'https://media.istockphoto.com/id/1175435360/vector/music-note-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=R7s6RR849L57bv_c7jMIFRW4H87-FjLB8sqZ08mN0OU=',
}

export const slick = {
    artist: {
        infinite: true,
        autoplaySpeed: 2500,
        autoplay: true,
        lazyload: true,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        variableWidth: true,
    },
    song: {
        infinite: true,
        autoplaySpeed: 3000,
        autoplay: true,
        lazyload: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        variableWidth: true,
    },
}
