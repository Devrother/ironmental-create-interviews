const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Schema = mongoose.Schema;

dotenv.config()

const {MONGODB_URL, MONGODB_NAME} = process.env;

const InterviewSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    question: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 150,
    },
    answer: {
        type: String,
        required: true,
        minlength: 10,
    },
    tags: {
        type: Array,
        default: [],
    },
    keywords: {
        type: Array,
        default: [],
    }
});

const TagSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    name: {
        type: String,
        minlength: 1,
        maxlength: 30,
    },
    interviews: [{type: Schema.Types.ObjectId, ref: 'Interview'}],
});

const Interview = mongoose.model('Interview', InterviewSchema);
const Tag = mongoose.model('Tag', TagSchema);


async function createInterview(interviews) {
    console.log('[+] Start creating interview !');
    for (const data of interviews) {
        const {question, answer, tags, keywords} = data;
        const interview = new Interview({question, answer, tags, keywords});
        const interviewId = (await interview.save())._id;
        console.log(`[+] Successful create interview "${question}" !`);

        for (let tag of tags) {
            tag = tag.toLowerCase();
            let result = await Tag.findOne({name: tag});
            if (!result) {
                let newTag = new Tag({
                    name: tag,
                    interviews: [interviewId]
                });

                await newTag.save();
                console.log(`[+] Successful create Tag ${tag}!`)
            } else {
                await Tag.findOneAndUpdate({name: tag}, {
                    $push: {
                        interviews: interviewId
                    }
                });
                console.log(`[+] Successful create Tag ${tag}!`)
            }

        }
    }
}

const datas = [
    {
        'question': 'question example',
        'keywords': ['keword1'],
        'tags': ['tag1'],
        'answer': 'answer example'

    },
];

mongoose.connect(`mongodb://${MONGODB_URL}/${MONGODB_NAME}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(() => {
    console.log('[+] Connected to mongodb server');
    createInterview(datas)
        .then(() => {
            console.log('[+] Finish ~~!')
        })
}).catch((e) => {
    console.log('[-] Fail !!');
    console.log(e)
});
