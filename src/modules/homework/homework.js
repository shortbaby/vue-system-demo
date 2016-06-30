export default function() {
	return [
		{
			type: 0,
			questionTxt: 'How do you  find  your new classmates? Most of them are kind, is so good to me as Bruce',
            answersList: ['none', 'no one', 'every one', 'some one'],
            answer: '',
            right: 3,
            select: 1,
            score: 20,
            level: 0
		},
		{
			type: 0,
			questionTxt: 'How do you  find  your new classmates? Most of them are kind, is so good to me as Bruce',
            answersList: ['none', 'no one', 'every one', 'some one'],
            answer: '',
            right: 3,
            select: 3,
            score: 20,
            level: 0
		},
		{
			type: 1,
			questionTxt: 'How do you  find  your new classmates? Most of them are kind, is so good to me as Bruce',
            answersList: ['none', 'no one', 'every one', 'some one'],
            answer: '',
            right: ["1", "2"],
            select: ["1", "2"],
            score: 20,
            level: 0
		},
		{
			type: 1,
			questionTxt: 'How do you  find  your new classmates? Most of them are kind, is so good to me as Bruce',
            answersList: ['none', 'no one', 'every one', 'some one'],
            answer: '',
            right: ["1", "2"],
            select: ["2"],
            score: 20,
            level: 0
		},
		{
			type: 2,
			content:[
				{
					type: 'fill',
					content: 'How do you  find'
				},
				{
					type: 'blank',
					content: 'classmates'
				},
				{
					type: 'fill',
					content: 'How do you  find'
				},
				{
					type: 'blank',
					content: 'classmates'
				}
			],
			answer: 'How do you  find so good to me as Bruce.',
            score: 20,
            level: 0
		},
		{
			type: 3,
			questionTxt: 'How do you  find  your new classmates? Most of them are kind, is so good to me as Bruce',
			answer: 'How do you  find  your new classmates? Most of them are kind, is so good to me as Bruce',
            score: 50,
            level: 0
		}
	]
}