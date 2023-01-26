// deklarasi variabel
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugas"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

app.get("/awal",(req,res)=>{
    let response = {
        message : "bissmilah"
    }
    res.json(response)
})


db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// end-point akses data pembeli
app.get("/pembeli", (req, res) => {
    // create sql query
    let sql = "select * from pelanggan"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                pembeli: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data siswa berdasarkan id_pembeli tertentu
app.get("/pembeli/:id", (req, res) => {
    let data = {
        id_pembeli: req.params.id
    }
    // create sql query
    let sql = "select * from datapelanggan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                pelanggan: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan datapelanggan
app.post("/datapelanggan", (req, res) => {

    // prepare data
    let data = {
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat
    }

    // create sql query insert
    let sql = "insert into datapelanggan set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah datapelanggan
app.put("/datapelanggan", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_pelanggan: req.body.nama_pelanggan,
            alamat: req.body.alamat
        },

        // parameter (primary key)
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    // create sql query update
    let sql = "update datapelanggan set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data siswa berdasarkan datapelanggan
app.delete("/datapelanggan/:id", (req, res) => {
    // prepare data
    let data = {
        id_pelanggan: req.params.id
    }

    // create query sql delete
    let sql = "delete from datapelanggan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

//barang

// end-point akses data barang
app.get("/databarang", (req, res) => {
    // create sql query
    let sql = "select * from barang"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                barang: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data barang berdasarkan databarang tertentu
app.get("/databarang/:id", (req, res) => {
    let data = {
        id_barang: req.params.id
    }
    // create sql query
    let sql = "select * from barang where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                barang: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data barang
app.post("/databarang", (req, res) => {

    // prepare data
    let data = {
        nama_barang: req.body.nama_barang,
        kondisi_barang :req.body.kondisi_barang,
        stok: Number (req.body.stok)
    }

    // create sql query insert
    let sql = "insert into databarang set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data barang
app.put("/databarang", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_barang: req.body.nama_barang,
            kondisi_barang :req.body.kondisi_barang,
            stok: Number (req.body.stok)
        },

        // parameter (primary key)
        {
            id_barang: req.body.id_barang
        }
    ]

    // create sql query update
    let sql = "update barang set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data barang berdasarkan id_barang
app.delete("/databarang/:id", (req, res) => {
    // prepare data
    let data = {
        id_barang: req.params.id
    }

    // create query sql delete
    let sql = "delete from barang where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

//admin

// end-point akses data admin
app.get("/dataadmin", (req, res) => {
    // create sql query
    let sql = "select * from dataadmin"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data dataadmin berdasarkan id_admin tertentu
app.get("/dataadmin/:id", (req, res) => {
    let data = {
        id_admin: req.params.id
    }
    // create sql query
    let sql = "select * from dataadmin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan dataadmin
app.post("/dataadmin", (req, res) => {

    // prepare data
    let data = {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin
      
    }

    // create sql query insert
    let sql = "insert into dataadmin set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data admin
app.put("/dataadmin", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_admin: req.body.nama_admin,            
            status_admin: req.body.status_admin            

            
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]

    // create sql query update
    let sql = "update dataadmin set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data barang berdasarkan id_barang
app.delete("/dataadmin/:id", (req, res) => {
    // prepare data
    let data = {
        id_admin: req.params.id
    }

    // create query sql delete
    let sql = "delete from dataadmin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})
   
app.listen(6000, ()=>{
    console.log("Alhamdullilah")
})