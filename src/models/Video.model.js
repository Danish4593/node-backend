import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type : String,
            requeired : true,
        },
        thumnail : {
            type : String,
            requeired : true
        },
        titel : {
            type : String,
            requeired : true
        },
        description : {
            type : String,
            requeired : true
        },
        duration : {
            type : Number,
            requeired : true
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    }, {timestamps : true}
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video', videoSchema);