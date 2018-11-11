import { AfterViewInit, Component } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaOfLaw, Jurisdiction } from '../../_models/legal-representative';
import { StateStore } from '../../_services/state-store.service';
declare var M: any;

@Component({
    selector: 'clients-landing-page',
    styleUrls: ['clients-main.component.scss'],
    templateUrl: 'clients-main.component.html'
}) export class ClientsMainComponent implements AfterViewInit {
    public readonly searchForm: FormGroup;

    public constructor(private readonly fb: FormBuilder, private readonly router: Router) {
        this.searchForm = fb.group({
            province: ['ca_BC'],
            areaOfLaw: ['family'],
            remote: [false]
        })
    }

    public ngAfterViewInit(): void {
        M.FormSelect.init(document.querySelectorAll('select'));
    }
    public search(): void {
        const { province, areaOfLaw, remote }: {province: Jurisdiction, areaOfLaw: AreaOfLaw, remote: boolean} = this.searchForm.getRawValue();
        StateStore.putState({
            searchCriteria: {
                jurisdiction: province,
                areaOfLaw: areaOfLaw,
                remote: remote
            }
        });
        this.router.navigate(['/dashboard']);
    }
}
