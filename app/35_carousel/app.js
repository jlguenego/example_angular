'use strict';
import 'font-awesome/css/font-awesome.css';

import './style.scss';

import 'angular';

import './my-carousel/my-carousel.js';


var app = angular.module('main', ['my-carousel']);

app.controller('BodyCtrl', function BodyCtrl() {
	var ctrl = this;
	ctrl.click = function() {
		window.alert('Bravo pour le click !');
	};
});
