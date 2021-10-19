import { Component, ViewChild } from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Component({
    selector: "home-page",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"]
})

export class HomePage {
    plate: string = "";
    plateLetters: string = "";
    plateNumbers: string = "";
    date: any = "";
    time: string = "";
    allowedToDrive: any;
    @ViewChild("plateLettersEl") plateLettersEl: any;
    @ViewChild("plateNumbersEl") plateNumbersEl: any;
    @ViewChild("dateEl") dateEl: any;
    @ViewChild("timeEl") timeEl: any;
    constructor (private httpClient: HttpClient) {}

    reset() {
        this.allowedToDrive = null;
    }

    plateLettersChanged(val: any) {
        this.reset();
        if (val.match(/^[^a-zA-Z]+$/)) {
            this.plateLettersEl.nativeElement.value = "";
        } else {
            this.plateLetters = val.toUpperCase();
            this.plateLettersEl.nativeElement.value = val.toUpperCase();
            if (this.plateLetters.length == 3) this.plateNumbersEl.nativeElement.focus();
        }
    }
    plateNumbersChanged(val: any) {
        this.reset();
        if (val.match(/^[^0-9]+$/)) {
            this.plateNumbersEl.nativeElement.value = "";
        }
        else {
            this.plateNumbers = val;
            if (this.plateNumbers.length == 4) this.dateEl.nativeElement.focus();
        }
    }
    verify() {
        this.plateLetters == "" ? this.plateLettersEl.nativeElement.classList.add("error") : this.plateLettersEl.nativeElement.classList.remove("error");
        this.plateNumbers == "" ? this.plateNumbersEl.nativeElement.classList.add("error") : this.plateNumbersEl.nativeElement.classList.remove("error");
        this.date == "" ? this.dateEl.nativeElement.classList.add("error") : this.dateEl.nativeElement.classList.remove("error");
        this.time == "" ? this.timeEl.nativeElement.classList.add("error") : this.timeEl.nativeElement.classList.remove("error");

        if (this.plateLetters != "" && this.plateNumbers != "" && this.date != "" && this.time != "") {
            this.checkPicoPlaca();
        }
    }
    checkPicoPlaca() {
        if  (+this.time.split(":")[0] < 7  || +this.time.split(":")[0] > 19) {
            this.allowedToDrive = true;
        } else {
            const date = new Date(this.date);
            var weekDay = date.getDay();
            const lastDigit = +this.plateNumbers[this.plateNumbers.length - 1];
            this.httpClient.get("../../../assets/picoplaca-rules.json").subscribe((snapshot:any) => {
                snapshot.holidays.includes(this.date) ? this.allowedToDrive = true : this.allowedToDrive = !snapshot.weekDays[weekDay].includes(lastDigit);
            });
        }
    }
}