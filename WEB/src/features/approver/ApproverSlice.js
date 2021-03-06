import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    pushToTopAsync,
    pushApprovedAsync,
    getTweets,
    deleteTweetAsync,
    getHashtagAsync,
    setHashtagAsync,
} from "./ApproverAPI";
export const tweetsApprovedPath = "tweetsApproved";
export const tweetsPendingPath = "tweetsPending";

const initialState = {
    value: "0",
    status: "idle",
    tweetsPending: [],
    tweetsApproved: [],
    hashtag: "",
};

export const getTweetsAsync = createAsyncThunk(
    "approver/fetchTweets",
    async() => {
        const tweetsApproved = await getTweets(tweetsApprovedPath);
        const tweetsPending = await getTweets(tweetsPendingPath);
        const hashtag = await getHashtagAsync();
        const response = { tweetsApproved, tweetsPending, hashtag };
        return response;
    }
);

export const pushApproved = createAsyncThunk(
    "approver/pushApproved",
    async(tweet) => {
        const response = await pushApprovedAsync(tweet);
        return { response, tweet };
    }
);

export const deleteTweet = createAsyncThunk(
    "approver/deleteTweet",
    async(payload) => {
        const response = await deleteTweetAsync(payload.tweet, payload.dbPath);
        return { response };
    }
);

export const pushToTop = createAsyncThunk(
    "approver/pushToTop",
    async(payload) => {
        const response = await pushToTopAsync(payload);
        return { response };
    }
);

export const setHashtag = createAsyncThunk(
    "approver/pushToTop",
    async(payload) => {
        const response = await setHashtagAsync(payload);
        return { response };
    }
);

export const selectTweetsPending = (state) => state.approver.tweetsPending;
export const selectTweetsApproved = (state) => state.approver.tweetsApproved;
export const selectHashtag = (state) => state.approver.hashtag;

export const approverSlice = createSlice({
    name: "approver",
    initialState,
    reducers: {
        updateApproved: (state, action) => {
            state.tweetsApproved = action.payload;
        },
        updatePending: (state, action) => {
            state.tweetsPending = action.payload;
        },
        updateTweets: (state, action) => {
            state.tweetsApproved = action.payload.tweetsApproved;
            state.tweetsPending = action.payload.tweetsPending;
        },
        updateHashtag: (state, action) => {
            state.hashtag = action.payload;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getTweetsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTweetsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.tweetsPending = action.payload.tweetsPending;
                state.tweetsApproved = action.payload.tweetsApproved;
                state.hashtag = action.payload.hashtag;
            });
    },
});

export default approverSlice.reducer;
export const { approveTweet, updateApproved, updatePending, updateTweets, updateHashtag } =
approverSlice.actions;

const responseSample = [{
        author_id: "4025725636",
        id: "1500679357764976641",
        text: "Eslo putassa com o gustavo por causa da lais\n#BBB",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1417329537327804431/KzgGH8QO_normal.jpg",
            id: "4025725636",
            username: "ale_alvez1",
            name: "Ale Alvez comentando o #BBB22 pq nao fui chamada",
        },
    },
    {
        author_id: "3344034316",
        id: "1500679355588124675",
        text: "Tudo bem vou ser sincera, nunca perdi meu tempo votando em BBB, mas nesse eu fa??o quest??o, pq soberba ?? um neg??cio que n??o me desce! #bbb #FORAJADEARROGANTE #ForaJade #ForaJaDeu",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1489025674312572929/1LccXMPu_normal.jpg",
            id: "3344034316",
            username: "RacheleCastro",
            name: "Rachele Castro",
        },
    },
    {
        author_id: "1330252207736885248",
        id: "1500679354229170176",
        text: 'quero o Tadeu falando na ter??a feira "ARTHUR, VC NEM PASSOU PERTO DE SAIR, QUEM SAI HOJE ?? VOC??, JADE" #ForaJade #ParedaoBBB #bbb22 #bbb',
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1498701592429830145/qdcAP4tF_normal.jpg",
            id: "1330252207736885248",
            username: "juulieny",
            name: "juulieny",
        },
    },
    {
        author_id: "1490890453985730560",
        id: "1500679348453621765",
        text: "Jade uuuuu #ForaJade #bbb",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1500417721816825857/vh7kZWPI_normal.jpg",
            id: "1490890453985730560",
            username: "GabrieleVahldi2",
            name: "Gabriele Vahldick",
        },
    },
    {
        author_id: "1461515857390092289",
        id: "1500679348415832064",
        text: "A mina ?? Podre de rica Nunca Deu Nada Pra Ngm Agr ta No #bbb pra doar o premio ???????????????????????????? \nInfelizmente esse premio nunca ter?? sua escrota nojenta  ???????????????? @jadepicon #ForaJade #ForaJadePiton #FicaArthur #arthurcampeao ??????????????",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1461516212123357187/J_fIslNi_normal.jpg",
            id: "1461515857390092289",
            username: "Renatofranca388",
            name: "Renato Fran??a",
        },
    },
    {
        author_id: "131059506",
        id: "1500679345526001664",
        text: "A soberba da Jade pode at?? ser aspiracional para as meninas novinhas q s??o o p??blico dela (minha filha de 8 anos quase me cancela por ?? curti-la!); mas quem decide #BBB desde 2002 n??o ?? o Twitter nem mt menos a gen Z. E a turma do sof?? n??o tem nem d??vida de quem quer eliminar!",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1078697725015793665/TNQSE5i4_normal.jpg",
            id: "131059506",
            username: "alegarattoni",
            name: "Ale Garattoni",
        },
    },
    {
        author_id: "227156035",
        id: "1500679328111153154",
        text: "O MUNDO EM GUERRA E A JADE COM DISCURSO DE ??DIO NO #BBB GRITANDO PRO ARTHUR SAIR.\n\nDITO ISSO, #ForaJade",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1360633708416557057/cjeYYQfj_normal.jpg",
            id: "227156035",
            username: "MauricioAmoriim",
            name: "Maur??cio Amorim",
        },
    },
    {
        author_id: "1403431757895159812",
        id: "1500679324231421952",
        text: "#FORAJADE #FORAJESSI #FORAARTHUR #FICAJADE #FICAJESSI #FICAARTHUR #BBB \nhttps://t.co/LKwcRXaJ0a",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1500620628801593345/fPkkOLQU_normal.jpg",
            id: "1403431757895159812",
            username: "sungkaangster",
            name: "hourly sir sungkang",
        },
    },
    {
        author_id: "1079391358803197953",
        id: "1500679307898806273",
        text: "Gente, a Jade ?? rid??cula, apelando pra caridade, mds, se t?? quer ajudar, usa sua grana que voc?? tem e n??o ?? pouca, pode usar seu insta, YouTube e tudo mais, meu Deus??????????????????????????????????????????????????? #bbb . Tags: #bbb22 #redebbb Prior #forajade #ParedaoBBB",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1323440972299120640/3ON6I5wb_normal.jpg",
            id: "1079391358803197953",
            username: "GohanSemVidel",
            name: "L??o",
        },
    },
    {
        author_id: "1129205358994567168",
        id: "1500679303469613056",
        text: "E vamos de primeira vez votando nessa edi????o? #ForaJade #ForaJadePiton #FicaArthur #Jadeu #BBB",
        user: {
            profile_image_url: "https://pbs.twimg.com/profile_images/1244755265301381122/fAJGj2GN_normal.jpg",
            id: "1129205358994567168",
            username: "walkerfisio",
            name: "Walker Martins",
        },
    },
];