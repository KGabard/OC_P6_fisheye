var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Api {
    constructor(url) {
        this.url = url;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(this.url);
                const data = yield res.json();
                if (!res.ok) {
                    Promise.reject('Error in 4xx or 5xx range');
                    return;
                }
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
export class PhotographerApi extends Api {
    constructor(url) {
        super(url);
    }
    getPhotographers() {
        return __awaiter(this, void 0, void 0, function* () {
            const fullData = yield this.get();
            if (!fullData)
                return;
            return fullData.photographers;
        });
    }
    getCurrentPhotographer(currentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const photographers = yield this.getPhotographers();
            if (!photographers)
                return;
            return photographers.find(photographer => photographer.id.toString() === currentId);
        });
    }
}
export class MediaApi extends Api {
    constructor(url) {
        super(url);
    }
    getAllMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            const fullData = yield this.get();
            if (!fullData)
                return;
            return fullData.media;
        });
    }
    getCurrentMedia(currentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mediaArray = yield this.getAllMedia();
            if (!mediaArray)
                return;
            return mediaArray.filter(media => media.photographerId.toString() === currentId);
        });
    }
}
