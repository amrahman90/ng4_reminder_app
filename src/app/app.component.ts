
import {Component, ElementRef, Renderer, OnInit} from '@angular/core';
import swal from 'sweetalert2';

@Component({
    selector: 'todo-app',
    templateUrl: './index.template.html'
})
export class AppComponent implements OnInit {

    public task: string;
    public time;
    public data = [];
    public timeLeft: any;
    public reminderTime;
    public displayLeftTimeString;
    public timeFormat;


    constructor(public element: ElementRef, public renderer: Renderer) {
    }

    ngOnInit(){
    }

    public toggleItemAdd() {
        if (this.task === '' || this.task === undefined) {
            swal('Enter the task....');
            return
        }
        if (this.time !== '' && this.time !== undefined) {
            this.reminderTime = Date.parse(this.time);
            let presentTime = new Date().getTime();
            this.timeLeft = (this.reminderTime - presentTime) / (3600 * 1000);
            this.denomination(this.timeLeft);
            if (Math.floor(this.timeLeft) !== 1) {
                this.displayLeftTimeString = 'in ' + Math.floor(this.timeLeft) + ' ' + this.timeFormat;
            } else {
                this.displayLeftTimeString = 'in ' + ' ' + this.timeFormat;
            }
        } else if (this.time === '') {
            swal('Enter complete time....');
            return
        } else if (this.time === undefined) {
            swal('Enter time of reminder ....');
            return
        }
        let reminder = {
            displayTask: '',
            displayLeftTime: ''
        };
        if (this.timeLeft > 0) {
            reminder.displayTask = this.task;
            reminder.displayLeftTime = this.displayLeftTimeString;
            this.data.push(reminder);
            swal(
                'Great..!',
                'Reminder added....!',
                'success'
            )
            console.log(this.data);
            this.task = '';
            this.time = '';
        } else {
            swal('Reminder is of previous date....!');
        }


    }

    public clearAll() {
        if (this.data.length !== 0) {
            swal({
                title: 'Are you sure you want to delete all the reminders ?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: true
            }).then(() => {
                this.data = [];
                swal(
                    'Deleted!',
                    'Your reminders have been deleted.',
                    'success'
                )
            }, (dismiss) => {
                // dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
                if (dismiss === 'cancel') {
                    swal(
                        'Cancelled',
                        'Your reminder is safe :)',
                        'error'
                    )
                }
            })
        } else {
            swal('No reminders to clear..!! ')
        }
    }

    public deleteItem(index) {
        swal({
            title: 'Are you sure you want to delete this reminder?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true
        }).then(() => {
            this.data.splice(index, 1);
            swal(
                'Deleted!',
                'Your reminder has been deleted.',
                'success'
            )
        }, (dismiss) => {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your reminder is safe :)',
                    'error'
                )
            }
        })

    }

    public denomination(value) {
        if (value > 8760) {
            this.timeLeft = value / 8760;
            if (Math.floor(this.timeLeft) === 1) {
                this.timeFormat = 'an year';
            }
            else {
                this.timeFormat = "years";
            }

        } else if (value > 744 && value < 8760) {
            this.timeLeft = value / 744;
            if (Math.floor(this.timeLeft) === 1) {
                this.timeFormat = "a month";
            }
            else {
                this.timeFormat = "months";
            }
        } else if (value > 24 && value < 744) {
            this.timeLeft = value / 24;
            if (Math.floor(this.timeLeft) === 1) {
                this.timeFormat = "a day";
            }
            else {
                this.timeFormat = "days";
            }
        } else {
            if (Math.floor(this.timeLeft) === 1) {
                this.timeFormat = "an hour";
            }
            else {
                this.timeFormat = "hours";
            }
        }
    }
}
