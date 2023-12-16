export interface IContent {
    page: 'FAVORITE' | 'ALBUM' | 'PLAYLISTS' | 'ARTIST'
    title: string
    subtitle: string
    image: string
    avatar?: string
}
