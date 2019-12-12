import { Component, OnInit } from '@angular/core';
const Yaml = require('js-yaml');
import { FormBuilder } from '@angular/forms';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-landing-component',
  templateUrl: './landing-component.component.html',
  styleUrls: ['./landing-component.component.css']
})
export class LandingComponentComponent implements OnInit {

  items = null;
  checkoutForm;
  questions = null;
  isLastQuestion = false;
  isRightAnswer = false;
  isFirstQuestion = true;
  length = 0;
  currentQuestion = null;
  index = 0;
  stage = null;
  correctAnswerCount = 0;
  totalQuestions = 0;
  answer = null;
  finished = false;


  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService
  ) {

    this.checkoutForm = this.formBuilder.group({
      yaml: ''
    });
  }

  ngOnInit() {
    this.questionService.getAllQuestions().subscribe((result: any) => {
      console.log(result)
      // if (result.success === true) {
      this.questions = result
      this.length = result.length
      this.currentQuestion = result[this.index];
      this.stage = Yaml.safeDump(this.currentQuestion.files.stage)
      this.answer = this.currentQuestion.files.answers
      this.checkoutForm.controls['yaml'].setValue(this.stage)
      // }
    }, (err: any) => {
      console.log(err);
    }, () => console.log());
  }

  finish() {
    this.totalQuestions = this.questions.length
    for (let question of this.questions) {
      if (JSON.stringify(question.files.stage) === JSON.stringify(question.files.answers)) {
        this.correctAnswerCount = this.correctAnswerCount + 1;
      }
    }
    this.finished = true
  }

  previous() {
    this.index = this.index - 1;
    this.currentQuestion = this.questions[this.index]
    console.log(this.currentQuestion)
    this.stage = Yaml.safeDump(this.currentQuestion.files.stage)
    this.answer = this.currentQuestion.files.answers
    if (JSON.stringify(this.currentQuestion.files.stage) === JSON.stringify(this.answer)) {
      this.isRightAnswer = true;
    } else {
      this.isRightAnswer = false;
    }
    this.checkoutForm.controls['yaml'].setValue(this.stage)
    if (this.index === 0) {
      this.isFirstQuestion = true
    } else {
      this.isFirstQuestion = false
    }
    if (this.index > this.length - 1) {
      this.isLastQuestion = true
    } else {
      this.isLastQuestion = false
    }
  }
  next() {
    this.index = this.index + 1;
    this.currentQuestion = this.questions[this.index]
    this.stage = Yaml.safeDump(this.currentQuestion.files.stage)
    this.answer = this.currentQuestion.files.answers
    this.checkoutForm.controls['yaml'].setValue(this.stage)

    this.isRightAnswer = false;
    if (this.index === 0) {
      this.isFirstQuestion = true
    } else {
      this.isFirstQuestion = false
    }
    if (this.index >= this.length - 1) {
      this.isLastQuestion = true
    } else {
      this.isLastQuestion = false
    }
  }

  onSubmit(customerData) {
    // Process checkout data here
    try {
      this.items = JSON.stringify(Yaml.safeLoad(customerData.yaml))
      this.questions[this.index].files.stage = JSON.parse(this.items)
      let ans = JSON.stringify(this.answer)
      if (this.items === ans) {
        this.isRightAnswer = true;
      } else {
        this.isRightAnswer = false;
      }
      console.log(this.items)
    } catch (e) {
      console.log(e);
    }
  }
}
