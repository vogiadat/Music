export interface IContent {
    page: 'FAVORITE' | 'ALBUM' | 'PLAYLISTS' | 'ARTIST' | 'CATEGORY'
    title: string
    subtitle: string
    image: string
    avatar?: string
}
