
export const CreateViewAllAlbumsPath = ({pageTitle}) => {
    const params = new URLSearchParams({
        title: albumTitle
    });

    return `/albums/view?${params.toString()}`;  
}

export const CreateDetailedAlbumPath = ({albumTitle}) => {
    const params = new URLSearchParams({
        title: albumTitle
    });

    return `/album?${params.toString()}`;
}