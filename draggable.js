class DraggableBox {
    constructor(boxList) {
        this.boxList = boxList;
        this.oBody = document.body;
        this.oDivInfoList = [];
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;


        this.init();
    }

    init () {
        this.createBox();
        this.bindEvent();
    }

    bindEvent () {
        this._documentMouseDown = this.documentMouseDown.bind(this);

        window.addEventListener('mousedown', this._documentMouseDown, false)
    }

    documentMouseDown (ev) {
        let e = ev || window.event,
            tar = e.target || e.srcElement,
            isMousedownDiv = this.oDivInfoList.find(({ oDiv }) => oDiv === tar);

        this.clinetX = e.clientX,
            this.clinetY = e.clientY;

        if (isMousedownDiv) {
            this. currentHandleDiv = tar;
            this.left = tar.offsetLeft;
            this.top = tar.offsetTop;
            this.width = parseInt(getComputedStyle(tar, null).width);
            this.height = parseInt(getComputedStyle(tar, null).height);
            this.diffX = this.clinetX - this.left;
            this.diffY = this.clinetY - this.top;

            this._documentMouseUp = this.documentMouseUp.bind(this);

            if (this.width - this.diffX <= 10 && this.height - this.diffY <= 10) {
                this._documentMouseMove = this.changBoxSize.bind(this);
            }else {
                this._documentMouseMove = this.boxMove.bind(this);
            }

            window.addEventListener('mousemove', this._documentMouseMove, false);
            window.addEventListener('mouseup', this._documentMouseUp, false);
        }
    }

    boxMove (ev) {
        let e = ev || window.event,
            clientX = e.clientX,
            clientY = e.clientY,
            left = clientX - this.diffX,
            top = clientY - this.diffY;

        if (left <= 0) {
            this.currentHandleDiv.style.left = 0;
        }else if (left >= this.innerWidth - this.width) {
            this.currentHandleDiv.style.left = this.innerWidth - this.width + 'px';
        }else {
            this.currentHandleDiv.style.left = left + 'px';
        }

        if (top <= 0) {
            this.currentHandleDiv.style.top = 0;
        }else if (top >= this.innerHeight - this.height) {
            this.currentHandleDiv.style.top = this.innerHeight - this.height + 'px';
        }else {
            this.currentHandleDiv.style.top = top + 'px';
        }
    }

    changBoxSize (ev) {
        let e = ev || window.event,
            x = e.clientX,
            y = e.clientY;

        if (x > this.left) {
            let w = x - this.left + (this.width - this.diffX);

            if (w >= this.innerWidth - this.left) {
                this.currentHandleDiv.style.width = this.innerWidth - this.left + 'px';
            }else {
                this.currentHandleDiv.style.width = w + 'px';
            }
        }else {

            this.currentHandleDiv.style.width = this.width - this.diffX + 'px' ;
        }

        if (y > this.top) {
            let h = y - this.top + (this.height - this.diffY);

            if (h >= this.innerHeight - this.top) {
                this.currentHandleDiv.style.height = this.innerHeight - this.top + 'px';
            }else {
                this.currentHandleDiv.style.height = h + 'px';
            }
        }else {
            this.currentHandleDiv.style.height = this.height - this.diffY + 'px';
        }
    }

    documentMouseUp () {
        window.removeEventListener('mousemove', this._documentMouseMove)
        window.removeEventListener('mouseup', this._documentMouseUp)
    }

    createBox () {
        const oFragments = document.createDocumentFragment();

        this.boxList.forEach(box => {
            let oDivInfo = new CreateBox(box)

            this.oDivInfoList.push(oDivInfo);
            oFragments.appendChild(oDivInfo.oDiv);
        });

        this.oBody.appendChild(oFragments);
    }
}

class CreateBox {
    constructor(boxInfo) {
        this.boxInfo = boxInfo;
        this.oDiv = document.createElement('div');

        this.createDiv(this.boxInfo);
    }

    createDiv (info) {
        this.oDiv.style.position = 'absolute';
        this.oDiv.style.left = info.x + 'px';
        this.oDiv.style.top = info.y + 'px';
        this.oDiv.style.width = info.width + 'px';
        this.oDiv.style.height = info.height + 'px';
        this.oDiv.style.backgroundColor = info.color;
        this.oDiv.classList = info.className.split(' ');
    }
}

