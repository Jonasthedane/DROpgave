import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IMusic {
    id: number;
    title: string;
    artist: string;
    songDuration: number;
}

let baseUri: string ="https://drrestservicecj.azurewebsites.net/api/records"

let getButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getMusic");
getButton.addEventListener("click", GetMusic);

let musicListOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("musicListOutput");

let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
deleteButton.addEventListener("click", DeleteSong);

let searchInput: HTMLInputElement = <HTMLInputElement>document.getElementById("searchInput");
let searchOutput: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("searchOutput");

let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchButton");
searchButton.addEventListener("click", SearchMusic);


let changeButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeSongButton");
changeButton.addEventListener("click", ChangeSong);

function ChangeSong(): void {
    let changeSongId: HTMLInputElement = <HTMLInputElement>document.getElementById("changeId");
    let changeSongTitle: HTMLInputElement = <HTMLInputElement>document.getElementById("changeTitle");
    let changeSongArtist: HTMLInputElement = <HTMLInputElement>document.getElementById("changeArtist");
    let changeSongDuration: HTMLInputElement = <HTMLInputElement>document.getElementById("changeSongDuration");

    let changeResponse: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("changeResponse");

    let myChangedId: number = Number(changeSongId.value);
    let myChangedTitle: string = changeSongTitle.value;
    let myChangedArtist: string = changeSongArtist.value;
    let myChangedSongDuration: number = Number(changeSongDuration.value);


}

function SearchMusic(): void {
    console.log("clicked");

    axios.get<IMusic[]>(baseUri)
    .then(function (response: AxiosResponse<IMusic[]>): void {
        let result: string = "<ul id='searchList'>";
        response.data.forEach((music : IMusic) => {
            if (searchInput.value == music.artist ) {
                result += "<li>" + music.id + " " + music.title + " " + music.artist + " " + music.songDuration; 
            }
        })
        result += "</ul>";
        searchOutput.innerHTML = result;        
    })

}

function GetMusic(): void {
    console.log("clicked");
    axios.get<IMusic[]>(baseUri)
    .then(function (response: AxiosResponse<IMusic[]>): void {
        let result: string = "<ul id='musicList'>";
        response.data.forEach((music: IMusic) => {
            result += "<li>" + music.id + " " + music.title + " " + music.artist + " " + music.songDuration; 
        });
        result += "</ul>";
        musicListOutput.innerHTML = result;
    })
}

let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addSongButton");
addButton.addEventListener("click", AddSong);


function AddSong(): void {
    let addSongId: HTMLInputElement = <HTMLInputElement>document.getElementById("songId");
    let addSongTitle: HTMLInputElement = <HTMLInputElement>document.getElementById("songTitle");
    let addSongArtist: HTMLInputElement = <HTMLInputElement>document.getElementById("songArtist");
    let addSongDuration: HTMLInputElement = <HTMLInputElement>document.getElementById("songDuration");

    let addResponseElement: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("AddResponse");

    let myId: number = Number(addSongId.value);
    let myTitle: string = addSongTitle.value;
    let myArtist: string = addSongArtist.value;
    let mySongDuration: number = Number(addSongDuration.value);

    axios.post<IMusic>(baseUri, {id: myId, title: myTitle, artist: myArtist, songDuration: mySongDuration})
    .then((response: AxiosResponse) => {
        let message: string = "Song added";
            addResponseElement.innerHTML = message;
            GetMusic();
    })
}


function DeleteSong(): void {
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteSongId");
    let outputElement: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("responseDelete");
    let id: string = inputElement.value;
    let uri: string = baseUri + "/" + id;

    axios.delete<IMusic>(uri)
    .then(function (response: AxiosResponse<IMusic>): void {
        outputElement.innerHTML = "the song with the id of: " + id + " has been deleted";
        GetMusic();
    })

}