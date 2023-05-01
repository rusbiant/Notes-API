const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_At,
  updated_At,
  username,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_At,
  updatedAt: updated_At,
  username,
});

module.exports = { mapDBToModel };
