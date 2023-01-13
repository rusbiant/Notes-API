const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_At,
  updated_At,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_At,
  updatedAt: updated_At,
});

module.exports = { mapDBToModel };
