import { Component, Input } from '@angular/core';
import { StarRating } from '../../_models/user';

@Component({
    selector: 'star-rating',
    styleUrls: ['star-rating.component.scss'],
    templateUrl: 'star-rating.component.html'
}) export class StarRatingComponent {
    @Input() public ratings: StarRating;
    @Input() public style: 'stars' | 'graph' | 'both' = 'stars';
}