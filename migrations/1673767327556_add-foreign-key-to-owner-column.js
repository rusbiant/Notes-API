/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //membuat user baru.
  pgm.sql("INSERT INTO users(id, username, password, fullname) values('old_notes', 'old_notes', 'old_notes', 'Old Notes')");

  //mengubah nilai owner pada note yg ownernya  bernilai NUll.
  pgm.sql("UPDATE notes SET owner ='old_notes' WHERE owner is NULL");

  //memberikan constraint foreign key pada owner terhapad kolom id pada tabel users.
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');
 
  // mengubah nilai owner old_notes pada note menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");
 
  // menghapus user baru.
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
