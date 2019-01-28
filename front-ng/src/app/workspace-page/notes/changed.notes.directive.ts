import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appChangedNotes]'
})
export class ChangedNotesDirective {

  @Input() appChangedNotes: string;

  @HostListener('focus', ['$event.target']) onFocus(target) {
    target.classList.add('note-focus');
    if (target.innerHTML.indexOf('-') !== -1) {
      target.innerHTML = '';
    }

    if (this.appChangedNotes === 'note') {
      target.select();
    }
  }

  @HostListener('blur', ['$event.target']) onBlur(target) {
    let rule: RegExp;
    let defaultStr: string;
    let value: string;

    value = 'innerHTML';

    switch (this.appChangedNotes) {
      case 'speed':
        rule = /^[1-9]$|^[1-9]\d{1,2}$/;
        defaultStr = '60';
        break;
      case 'numerator':
        rule = /^[1-9]$|^1[0-6]$/;
        defaultStr = '2';
        break;
      case 'denominator':
        rule = /^2$|^4$|^8$|^16$/;
        defaultStr = '2';
        break;
      default:
        rule = /^\d$|^1\d$|^20$/;
        defaultStr = '-';
        value = 'value';
        break;
    }

    if (!rule.test(target[value])) {
      target[value] = defaultStr;
    }

    target.classList.remove('note-focus');
  }

  @HostListener('keypress', ['$event.target', '$event.keyCode']) onKeyPress(target, keyCode) {
    if (keyCode === 13) {
      target.blur();
    } else if (keyCode !== 8 && keyCode !== 46 && (keyCode < 37 || keyCode > 40) && (keyCode < 48 || keyCode > 57)) {
      return false;
    }
  }

}
