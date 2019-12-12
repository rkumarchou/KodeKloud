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
  showSolution = false;
  solution;
  currentQuestion = null;
  index = 0;
  stage = null;
  correctAnswerCount = 0;
  totalQuestions = 0;
  answer = null;
  finished = false;
  content;
  codeMirrorOptions: any = {
    theme: 'ambiance',
    mode: 'application/yaml',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };
  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService
  ) {

    this.checkoutForm = this.formBuilder.group({
      yaml: ''
    });
  }

  setEditorContent(event) {
    // console.log(event, typeof event);
    console.log(this.content);
  }

  ngOnInit() {
    this.content = JSON.stringify({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "title": "Object",
      "additionalProperties": false,
      "properties": {
        "string": {
          "type": "string",
          "title": "String"
        }
      }
    }, null, ' ');
    this.questionService.getAllQuestions().subscribe((result: any) => {
      console.log(result)
      // if (result.success === true) {
      this.questions = result
      this.length = result.length
      this.currentQuestion = result[this.index];
      this.stage = Yaml.safeDump(this.currentQuestion.files.stage)
      this.answer = this.currentQuestion.files.answers
      this.solution = Yaml.safeDump(this.answer)
      console.log(this.solution)
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
    console.log(this.index)
    this.stage = Yaml.safeDump(this.currentQuestion.files.stage)
    this.answer = this.currentQuestion.files.answers
    this.solution = Yaml.safeDump(this.answer)
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

  toggleSolution(bool) {
    console.log(bool)
    if (bool) {
      this.showSolution = true
    } else {
      this.showSolution = false
    }
  }

  next() {
    this.index = this.index + 1;
    this.currentQuestion = this.questions[this.index]
    this.stage = Yaml.safeDump(this.currentQuestion.files.stage)
    this.answer = this.currentQuestion.files.answers
    this.solution = Yaml.safeDump(this.answer)
    this.checkoutForm.controls['yaml'].setValue(this.stage)
    console.log(this.index)
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

  resetAnswer() {
    console.log('reset answer')
    console.log(this.currentQuestion.files.stagedAnswer)
    if (this.currentQuestion.files.stagedAnswer) {
      this.stage = this.currentQuestion.files.stagedAnswer
    }
    this.checkoutForm.controls['yaml'].setValue(this.stage)
  }

  onSubmit(customerData) {
    // Process checkout data here
    try {
      this.items = JSON.stringify(Yaml.safeLoad(customerData.yaml))
      this.questions[this.index].files.stagedAnswer = this.stage
      this.questions[this.index].files.stage = JSON.parse(this.items)
      let ans = JSON.stringify(this.answer)
      console.log(this.items)
      console.log(ans)
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
