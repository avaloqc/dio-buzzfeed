import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = true;
  result: string = "";

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoice(value: string) {
    this.answers.push(value);
    console.log(value);
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex++;
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      await this.determineResult()
      this.finished = true;
    }
  }

  async determineResult() {
    const counts: any = {};
    this.answers.forEach(x => {counts[x] = (counts[x] || 0) + 1} );
    if (counts['A']> counts['B']) {
      this.result = quizz_questions.results['A'];
    } else {
      this.result = quizz_questions.results['B'];
    }

  }
}
