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

    plateLettersChanged() {
        this.reset();
        this.plateLetters = this.plateLetters.replace(RegExp(/[^a-zA-Z]/), "").toUpperCase();
        this.plateLettersEl.nativeElement.value = this.plateLetters;
        if (this.plateLetters.length == 3) this.plateNumbersEl.nativeElement.focus();
    }

    plateNumbersChanged() {
        this.reset();
        this.plateNumbers = this.plateNumbers.replace(RegExp(/[^0-9]/), "");
        this.plateNumbersEl.nativeElement.value = this.plateNumbers;
        if (this.plateNumbers.length == 4) this.dateEl.nativeElement.focus();
    }

    verify() {
        if (this.plateLetters != "" && this.plateNumbers != "" && this.date != "" && this.time != "") {
            this.checkPicoPlaca();
        } else {
            this.highlightErrors();
        }
    }

    highlightErrors() {
        this.plateLetters == "" ? this.plateLettersEl.nativeElement.classList.add("error") : this.plateLettersEl.nativeElement.classList.remove("error");
        this.plateNumbers == "" ? this.plateNumbersEl.nativeElement.classList.add("error") : this.plateNumbersEl.nativeElement.classList.remove("error");
        this.date == "" ? this.dateEl.nativeElement.classList.add("error") : this.dateEl.nativeElement.classList.remove("error");
        this.time == "" ? this.timeEl.nativeElement.classList.add("error") : this.timeEl.nativeElement.classList.remove("error");
    }
    
    checkRestrictedTime() {
        var timeStamp = (new Date()).setHours(+this.time.split(":")[0], +this.time.split(":")[1]);
        var restrictedTime = {
            start1: (new Date()).setHours(7, 0),
            start2: (new Date()).setHours(16, 0),
            end1: (new Date()).setHours(9, 30),
            end2: (new Date()).setHours(19, 30),
        }
        return (
            (timeStamp >= restrictedTime.start1 && timeStamp <= restrictedTime.end1) 
            || 
            (timeStamp >= restrictedTime.start2 && timeStamp <= restrictedTime.end2)
        );
    }

    checkPicoPlaca() {
        if  (!this.checkRestrictedTime()) {
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