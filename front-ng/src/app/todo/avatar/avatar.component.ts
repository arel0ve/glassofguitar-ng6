import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AvatarService} from '../../api/avatar/avatar.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  photoUrl: string;
  file: File;
  isCurrentUser: boolean;

  constructor(
      private route: ActivatedRoute,
      private avatarService: AvatarService,
      private location: Location
  ) { }

  ngOnInit() {
    this.photoUrl = 'url(assets/photos/no-photo.png)';
    this.isCurrentUser = false;
    this.route.queryParams.subscribe(value => {
      if (value && value.length > 0) {
        this.avatarService.getAvatar(value['login'])
            .subscribe(
                res => {
                  if (res['photoUrl']) {
                    this.photoUrl = `url(${res['photoUrl']})`;
                  }
                  if (res['status'] === 'ok') {
                    this.isCurrentUser = true;
                  }
                  }
            );
      }
    });

  }

  loadAvatar(event: Event) {
    const reader = new FileReader();
    const self = this;

    const el: HTMLInputElement = event.target as HTMLInputElement;
    if (el.files.length) {
      this.file = el.files[0];

      reader.onload = function(e) {
        const img = document.createElement('img');

        img.onload = function() {
          const canv = document.createElement('canvas');
          canv.width = 640;
          canv.height = 640;
          const ctx = canv.getContext('2d');

          let width = this['width'] || 640;
          let height = this['height'] || 640;

          width = Math.min(width, height);
          height = Math.min(width, height);

          ctx.drawImage(img, 0, 0, width, height, 0, 0, canv.width, canv.height);
          self.photoUrl = canv.toDataURL();

          canv.toBlob(function (blob) {

            const formData = new FormData();
            formData.append('fileUploaded', blob, 'pic.png');

            self.avatarService.postAvatar(formData).subscribe(() => self.location.back());
          });

        };
        img.src = e.target['result'];
      };
      reader.readAsDataURL(this.file);
    }
  }

}
