import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';           // pour [(ngModel)]
import { LotService } from '../../services/lot.service';
import { LotMortService } from '../../services/lotMort.service';
import { LotMort } from '../../model/lotMort.model';
import { Lot } from '../../model/lot.model';
import { RouterModule } from '@angular/router';