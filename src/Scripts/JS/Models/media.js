export class Media {
    constructor(media) {
        this._media = media;
    }
    get id() {
        return this._media.id;
    }
    get photographerId() {
        return this._media.photographerId;
    }
    get title() {
        return this._media.title;
    }
    get type() {
        if (this._media.hasOwnProperty('image')) {
            return 'picture';
        }
        else if (this._media.hasOwnProperty('video')) {
            return 'video';
        }
        else {
            throw 'Unknonw type format';
        }
    }
    get src() {
        switch (this.type) {
            case 'picture':
                return `./src/Assets/Media/Pictures/${this._media.image}`;
            case 'video':
                return `./src/Assets/Media/Movies/${this._media.video}`;
            default:
                return;
        }
    }
    get likes() {
        return this._media.likes;
    }
    get date() {
        return this._media.date;
    }
    get price() {
        return `${this._media.price}€`;
    }
}
