const { nanoid } = require('nanoid');
const Content = require('../models/Content');
const Recent = require('../models/Recent');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.TOKEN_KEY);

/**
 * Verify if the client is an admin.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.verifyAdmin = (req, res) => {
    const { token } = req.body
    try {
        const d = cryptr.decrypt(token);
        if (d.split('::')[0] == process.env.ADMIN_USER) {
            res.status(200).send({ success: true })
        }

    }
    catch (e) {
        res.status(401).send({ success: false })
    }
}

/**
 * Login admin and send a response login token.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.adminLogin = (req, res) => {
    const { user, pass } = req.body
    if (user == process.env.ADMIN_USER && pass == process.env.ADMIN_PASS) {
        const e = cryptr.encrypt(`${user}::${pass}`);
        res.status(200).send({ success: true, token: e })
    }
    else {
        res.status(401).send({ success: false })
    }
}

/**
 * Update an item as admin
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateItem = (req, res) => {
    const { itemId, downloads, views, token } = req.body;
    try {
        const d = cryptr.decrypt(token);
        if ((parseInt(d) + 10000) < new Date().getTime()) {
            res.status(505).send({ err: "Token Expired!" })
            return
        }
    }
    catch (e) {
        res.status(505).send({ err: "Invalid Token!" })
        return
    }
    Content.updateOne(
        { slug: itemId },
        { "$inc": { downloads: downloads ? 1 : 0, views: views ? 1 : 0 } })
        .then(data => {
            res.send({ success: true })
        }).catch(err => {
            res.send(err)
        })
}

/**
 * Upload an item as admin
 * @param {Object} req 
 * @param {Object} res 
 */
exports.uploadItem = async (req, res) => {
    const pass = req.body.pass
    if (pass != process.env.TOKEN_KEY) {
        res.send({ success: false })
        return;
    }
    const {
        title,
        downloadLinks,
        mediaInfo,
        summary,
        hosts,
        language,
        size,
        category,
        ref,
        author
    } = req.body
    var slug = await nanoid(10);
    const item = {
        slug,
        title,
        downloadLinks,
        mediaInfo,
        summary,
        hosts,
        language,
        size,
        ref,
        category,
        author
    }

    Content.create(item)
        .then(data => {
            res.send({ data, success: true })
        }).catch(err => {
            res.send(err)
        })

}