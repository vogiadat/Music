const host = import.meta.env.BASE_URL

export const endPoint = {
    home: host.concat(''),
    favor: host.concat('favourite'),
    recent: host.concat('recent'),
    albums: host.concat('albums'),
    download: host.concat('download'),
    upload: host.concat('upload'),
    music: host.concat('music'),
}
