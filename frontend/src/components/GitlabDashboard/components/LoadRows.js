import axios from "axios";
import { mergeRequestToShow } from "./GitlabProfile";

const loadMoreRows = function ({
    startIndex,
    stopIndex,
    setLoading,

    setList,
    setLastLoadedIndex,
    list,
    setRemoteCount,
}) {
    setLoading(true);

    let myPromise = new Promise(function (myResolve, myReject) {
        myResolve("OK");
    });

    return myPromise.then(() => {
        let len = mergeRequestToShow.length();
        let lastIndex = Math.min(len - 1, stopIndex);
        if (startIndex <= lastIndex) {
            let arr = mergeRequestToShow.slice(startIndex, lastIndex + 1);
            setList([...list, ...arr]);
        }

        setLastLoadedIndex(lastIndex);
        setLoading(false);
        setRemoteCount(Math.min(len, stopIndex + 20));
    });
};

export default loadMoreRows;
