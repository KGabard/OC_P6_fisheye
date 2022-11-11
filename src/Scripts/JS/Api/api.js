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
        this._url = url;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(this._url);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const data = yield res.json();
                if (!res.ok) {
                    Promise.reject(new Error('Error in 4xx or 5xx range'));
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
export class PhotographerApi extends Api {
    getPhotographers() {
        return __awaiter(this, void 0, void 0, function* () {
            const fullData = yield this.getData();
            if (!fullData) {
                return;
            }
            return fullData.photographers;
        });
    }
    getCurrentPhotographer(currentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const photographers = yield this.getPhotographers();
            if (!photographers) {
                return;
            }
            return photographers.find((photographer) => photographer.id.toString() === currentId);
        });
    }
}
export class MediaApi extends Api {
    getAllMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            const fullData = yield this.getData();
            return fullData ? fullData.media : undefined;
        });
    }
    getCurrentMedia(currentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mediaArray = yield this.getAllMedia();
            return mediaArray
                ? mediaArray.filter((media) => media.photographerId.toString() === currentId)
                : undefined;
        });
    }
}
