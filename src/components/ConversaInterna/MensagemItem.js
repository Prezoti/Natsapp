import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Image } from 'react-native';

export default class MensagemItem extends Component {

	constructor(props) {
		super(props);

		let bgColor = '#DDDDDD';
		let align = 'flex-start';
		let txtAlign = 'left';


		if(this.props.data.uid == this.props.me) {
			bgColor = '#FFFFFF'; 
			align = 'flex-end';
			txtAlign = 'right';
		}

		this.state = {
			bgColor:bgColor,
			align:align,
			txtAlign:txtAlign,
			dateMsg:this.getFormatedDate(this.props.data.date)
		};

		this.imageClicked = this.imageClicked.bind(this);
	}

	imageClicked() {
		this.props.onImagePress(this.props.data.imgSource);
	}

	getFormatedDate(originalDate) {
		let cDate = new Date();
		let mDate = originalDate.split(' ');

		let ano = cDate.getFullYear();
		let mes = cDate.getMonth()+1; if((mes/10)<1) {mes='0'+mes;}
		let dia = cDate.getDate(); if((dia/10)<1) {dia='0'+dia;}

		let todayDate = ano+'-'+mes+'-'+dia;

		let newDate = mDate[1];

		if(todayDate != mDate[0]) {
			let newDays = mDate[0].split('-');
			newDate =newDays[2]+'/'+newDays[1]+'/'+newDays[0]+' '+newDate;
		}

		return newDate;
	}

	render() {
		return(
			<View style={[MsgStyles.area, {alignSelf:this.state.align, backgroundColor:this.state.bgColor}]} >

				{this.props.data.msgType == 'text' &&
					<Text style={{textAlign:this.state.txtAlign, color:'#000000'}}>{this.props.data.m}</Text>
				}
				{this.props.data.msgType == 'image' &&
					<TouchableHighlight onPress={this.imageClicked} >
						<Image resizeMethod="resize" style={MsgStyles.image} source={{uri:this.props.data.imgSource}} />
					</TouchableHighlight>
				}
				<Text style={MsgStyles.dateTxt}>{this.state.dateMsg}</Text>
				
			</View>
		);
	}

}

const MsgStyles = StyleSheet.create({
	area:{
		marginLeft:10,
		marginRight:10,
		marginTop:5,
		marginBottom:5,
		padding:10,
		maxWidth:'80%',
		borderWidth:1,
		borderRadius:10
	},
	dateTxt:{
		fontSize:10,
		textAlign:'right'
	},
	image:{
		width:180,
		height:120
	}
});