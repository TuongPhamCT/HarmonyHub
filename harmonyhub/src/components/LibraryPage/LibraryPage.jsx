import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../components/Global.css';
import { AlbumService } from '../../services/apiCall/album';
import { SongService } from '../../services/apiCall/song';
import { handleOnClickAlbum, handleOnClickSong } from '../../services/itemOnClickService';
import '../LibraryPage/LibraryPage.css';
import Footer from '../MainPage/Footer';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import { AlbumBox, MusicBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { TextButton } from '../SmallComponents/TextButton';
import { ToggleButton } from '../SmallComponents/ToggleButton';
import { sBoxAlts, sComponents } from '../SmallComponents/componentStore';
import { CreateAlbum } from './partials/CreateAlbum';
// import { useEffect } from 'react';

const libraryTabs = [
    "Song",
    "Album",
    // "MV"
]

export default function LibraryPage() {
    const nav = useNavigate();
    const [tab, setTab] = useState("Song");

    const [showCreateAlbum, setShowCreateAlbum] = useState(false);

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(true);

    const handleTabClick = (tabName) => {
        setTab(tabName);
    }

    const handleRemoveSong = async (data) => {
        // call api
        await SongService.deleteSong(data.id);
    }

    const handleRemoveAlbum = useCallback((id) => {
        setAlbums((prev) => prev.filter((sAlbum) => id !== sAlbum.props.data.id));
    }, []);

    const handleUpdateAlbum = useCallback((item, oldItem) => {
        // const newAlbum = <AlbumBox
        //     key={item.id}
        //     title={item.title}
        //     data={item}
        //     subtitle={item.description}
        //     boxAlt={sBoxAlts.value.albumBoxInLibrary}
        //     onClick={() => handleOnClickAlbum(nav, item.id)}
        //     onUpdate={(newItem) => handleUpdateAlbum(newItem, item)}
        //     onRemove={() => handleRemoveAlbum(item.id)}
        // ></AlbumBox>;

        // setAlbums((prev) => {
        //     const newArray = [...prev]; // Sao chép mảng
        //     let targetIndex = 0;
        //     newArray.forEach((i, index) => {
        //         if (i.props.data.id === oldItem.id) {
        //             targetIndex = index;
        //         }
        //     });
        //     newArray[targetIndex] = newAlbum;
        //     return newArray; // Trả về mảng mới để cập nhật state
        // });
        setForceUpdate(!forceUpdate);
    }, [forceUpdate]);

    const tabs = libraryTabs.map(
        (item) => (
            <ToggleButton key={"library-tab-" + item} text={item}
                activeColor="#EE10B0" color="white" width="24vh" height="100%"
                active={item === tab} onClick={() => handleTabClick(item)}/>
        )
    );

    useEffect(() => {
 
        // call api to get data
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const dataSongs = await SongService.getMySongs({
                sortBy: "createdAt",
                order: "desc",
            }) || [];
            const dataAlbums = await AlbumService.getMyAlbums({
                sortBy: "releaseDate",
                order: "desc",
            }) || [];
    
            setSongs(
                dataSongs.map(
                    (item) => (
                        <MusicBox
                            key={item.id}
                            title={item.name}
                            subtitle={item.artist}
                            data={item}
                            image={item.image}
                            boxAlt={sBoxAlts.value.musicBoxInLibrary}
                            onClick={() => handleOnClickSong(item)}
                            onRemove={() => {
                                setSongs((prev) => prev.filter((sSong) => item.id !== sSong.props.data.id));
                                handleRemoveSong(item);
                            }}
                        ></MusicBox>
                    )
                )
            );
    
            setAlbums(
                dataAlbums.map(
                    (item) => (
                        <AlbumBox
                            key={item.id}
                            title={item.title}
                            data={item}
                            image={item.image}
                            subtitle={item.description}
                            boxAlt={sBoxAlts.value.albumBoxInLibrary}
                            onClick={() => handleOnClickAlbum(nav, item.id)}
                            onUpdate={(newItem) => handleUpdateAlbum(newItem, item)}
                            onRemove={() => handleRemoveAlbum(item.id)}
                        ></AlbumBox>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
    }, [nav, handleUpdateAlbum, handleRemoveAlbum, forceUpdate]);

    // const videoCollection = demoList.map(
    //     (item, index) => (
    //         <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
    //     )
    // )

    const tabComponents = {
        "Song": 
            <ItemCollectionVertical
                itemList={songs}
                title={"Song"}
                columnWidth={sComponents.value.musicBoxWidth}
            />,
        "Album": 
            <ItemCollectionVertical 
                itemList={albums}
                title={"Album"}
                columnWidth={sComponents.value.albumBoxWidth}
            />,
        // "MV":
        //     <ItemCollectionVertical
        //         itemList={videoCollection}
        //         title={"MV"}
        //         columnWidth={sComponents.value.mvBoxWidth}
        //     />,
    }

    const handleAddNew = () => {
        switch (tab) {
            case "Song":
                {
                    nav('/addsong');
                    break;
                }
            case "Album":
                {
                    // create component
                    setShowCreateAlbum(true);
                    toggleMainContentScroll(false);
                    break;
                }
            default:
                break;
        }
    }

    return (
        <div id="library-page">
            <p id="library-title">Library</p>
            <div id="library-tabs-wrapper">
                <div id="library-tabs-container">
                    {tabs}
                </div>
                <TextButton text="Add new" borderColor="#0E9EEF" backgroundColor="#0E9EEF"
                    color="white" width="18vh" height="100%" onClick={() => handleAddNew()}/>
            </div>
            <hr />
            {
                tabComponents[tab] || null
            }
            <Footer />

            {
                showCreateAlbum && (
                    <CreateAlbum
                        onClose={() => {
                            setShowCreateAlbum(!showCreateAlbum);
                            toggleMainContentScroll(true);
                        }}
                        onCreate={() => {
                            setForceUpdate(!forceUpdate);
                        }}
                    />
                )
            }
        </div>
    );
}
