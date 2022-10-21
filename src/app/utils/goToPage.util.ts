import { Router } from '@angular/router';

class PageTarget {
    constructor(private router:Router) {}

    public toPage(path: string) {
        this.router.navigateByUrl(path);
    }   
}